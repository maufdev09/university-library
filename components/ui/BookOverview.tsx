"use client";

import React from "react";
import { Book } from "@/type";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  color,
  cover,
}: Book) => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cover})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white space-y-5">
          <p className="text-sm uppercase tracking-widest text-gray-300">
            {genre}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>

          <p className="text-lg text-gray-300">by {author}</p>

          <div className="flex items-center gap-4 text-sm">
            <span>⭐ {rating}/5</span>
            <span>
              📚 {available_copies}/{total_copies} Available
            </span>
          </div>

          {/* CTA */}
          <button
            className="mt-4 px-6 py-3 rounded-xl font-semibold"
            style={{ backgroundColor: color }}
          >
            Borrow Now
          </button>
        </div>

        {/* RIGHT IMAGE (optional card style) */}
        <div className="hidden md:flex justify-center">
          <img
            src={cover}
            alt={title}
            className="w-[280px] rounded-2xl shadow-2xl hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
