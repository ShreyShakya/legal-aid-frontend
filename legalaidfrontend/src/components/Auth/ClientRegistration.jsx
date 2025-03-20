"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scale } from "lucide-react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import styles from "./ClientRegistration.module.css"

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function ClientRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsError(false)

    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register-client', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setMessage(response.data.message)
      setIsError(false)
      setFormData({ name: "", email: "", password: "", phone: "" })
      setTimeout(() => navigate('/client-login'), 2000)
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className={styles.landingPage}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Scale className={styles.logoIcon} />
            <span>NepaliLegalAidFinder</span>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div className={styles.heroContent}>
            <h1>Register as a Client</h1>
            <p>Sign up to find legal assistance.</p>

            <form onSubmit={handleSubmit} className={styles.registrationForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number (optional)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
            {message && (
              <p className={`${styles.message} ${isError ? styles.error : ''}`}>
                {message}
              </p>
            )}
            <p className={styles.authLink}>
              Already have an account? <Link to="/client-login">Login here</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}