"use client"

import { useEffect, useState } from "react"
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { ClientReviews } from "@/components/ui/client-reviews"

type Review = {
  rating: number
  reviewer: string
  roleReviewer: string
  review: string
  date: string
}

export default function Reviews() {
  const [text, setText] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])

  // ----------------------------
  // Fetch reviews from Firebase
  // ----------------------------
  const fetchReviews = async () => {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    )

    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => {
      const r = doc.data()

      return {
        rating: 5,
        reviewer: "Anonymous User",
        roleReviewer: "Verified User",
        review: r.review,
        date: r.createdAt?.toDate().toISOString().split("T")[0],
      }
    })

    setReviews(data)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // ----------------------------
  // Submit review
  // ----------------------------
  const submit = async () => {
    if (!text.trim()) return

    await addDoc(collection(db, "reviews"), {
      review: text,
      createdAt: new Date(),
    })

    setText("")
    fetchReviews()
  }

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 space-y-12">
      <h2 className="text-3xl font-semibold text-center">
        What Users Are Saying
      </h2>

      {/* Reviews UI */}
      <ClientReviews reviews={reviews} />

      {/* Review input */}
      <div className="max-w-xl mx-auto space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border rounded-xl p-4 bg-background"
        />

        <Button className="w-full" onClick={submit}>
          Submit Review
        </Button>
      </div>
    </section>
  )
}
