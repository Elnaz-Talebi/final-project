"use server";

export async function SubmitReviewForm(formData) {
  const comment = formData.get("comment");
  const rating = formData.get("rating");

  const plantId = formData.get("plant-id");

  const reviewData = {
    plantId: Number(plantId),
    comment,
    rating: Number(rating),
  };

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.warn("Failed to parse JSON response:", err);
      data = null;
    }

    if (!response.ok) {
      throw new Error(data.error || "Unknown server error");
    }

    return {
      success: true,
      review: data,
      message: "Review submitted successfully!",
    };
  } catch (error) {
    console.error("Error sending review:", error);
    return {
      success: false,
      message: error.message || "Failed to connect to server",
    };
  }
}
