import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Buy = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const res = localStorage.getItem("isLoggedIn");
    if (res !== "true") {
      navigate("/login");
      return;
    }

    const fetchCourse = async () => {
      try {
        const courseRes = await axios.get(
          `http://localhost:3000/course/single-course/${courseId}`,
          { withCredentials: true }
        );
        setCourse(courseRes.data.course);
      } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Failed to load course details'
        setError(msg)
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handlePurchase = () => {
    if (processing) return
    setProcessing(true)
    setError("")

    axios
      .post(
        `http://localhost:3000/payment/create-order/${courseId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const { order, keyId } = res.data;

        const options = {
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: "CourseHaven",
          description: `Purchase - ${course?.title}`,
          order_id: order.id,

          handler: async (response) => {
            try {
              await axios.post(
                "http://localhost:3000/payment/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: courseId,
                },
                { withCredentials: true }
              )
              navigate("/purchases")
            } catch (err) {
              const msg = err?.response?.data?.message || err?.message || 'Payment verification failed'
              if (msg === 'Course already purchased') {
                navigate('/purchases')
                return
              }
              setError(msg)
              setProcessing(false)
            }
          },

          prefill: {
            name: "User",
            email: "user@example.com",
            contact: "9999999999",
          },

          theme: {
            color: "#ff4500",
          },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || err?.message || 'Failed to initiate payment. Please try again.'
        setError(msg)
        setProcessing(false)
      })
  };

  if (loading) {
    return (
      <div id="buy-page">
        <div className="loading-container">
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div id="buy-page">
        <div className="error-container">
          <p>Course not found</p>
          <button onClick={() => navigate("/courses")} className="btn-primary">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="buy-page">
      <button onClick={() => navigate("/courses")} className="back-button">
        ← Back to Courses
      </button>

      <div className="buy-container">
        <div className="course-detail">
          <img src={course.image} alt={course.title} className="course-image" />
          
          <div className="course-info">
            <h1>{course.title}</h1>
            <p className="description">{course.description}</p>
            
            <div className="price-section">
              <p className="price-label">Price</p>
              <p className="price">Rs. {course.price}</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              onClick={handlePurchase}
              disabled={processing}
              className="btn-primary btn-large"
            >
              {processing ? "Processing..." : "Buy Now"}
            </button>

            <p className="secure-note">
              ✓ Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
