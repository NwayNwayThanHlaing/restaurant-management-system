"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// component for handling payment details
const PaymentPage = () => {
  // define months and years for expiry date selection
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(null, i + 1, null);
    return month.toLocaleString("default", { month: "long" });
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
  const router = useRouter();

  // useForm hook for form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // function to execute on form submission
  const onSubmit = () => {
    alert("Payment successful! Your order is being processed.");
    reset();
    router.push("/");
  };

  return (
    <div style={styles.container} className="my-28">
      <h1 className="mb-3 text-lg font-bold mt-14">Payment Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            style={styles.input}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            style={styles.input}
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            style={styles.input}
            maxLength="16"
            {...register("cardNumber", { required: true })}
          />
          {errors.cardNumber && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            style={styles.input}
            maxLength="3"
            {...register("cvv", { required: true })}
          />
          {errors.cvv && <p className="text-red-600">This field is required</p>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="expiryMonth">Expiry Month</label>
          <select
            id="expiryMonth"
            style={styles.input}
            {...register("expiryMonth", { required: true })}
          >
            <option value="">Select</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          {errors.expiryMonth && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="expiryYear">Expiry Year</label>
          <select
            id="expiryYear"
            style={styles.input}
            {...register("expiryYear", { required: true })}
          >
            <option value="">Select</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.expiryYear && (
            <p className="text-red-600">This field is required</p>
          )}
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Submit
          </button>
          <button type="button" style={styles.button}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;

// styles for PaymentPage component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    width: "500px",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "6px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 5px",
    fontSize: "16px",
    backgroundColor: "rgb(190, 10, 40)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    minWidth: "100px",
  },
};
