'use client';

export default function Footer() {
  return (
    <div className="relative bottom-0 bg-on_primary flex flex-row w-screen border-solid border-t-2 border-gray-100 p-8 gap-10">
      <div className="flex flex-col gap-2">
        <h1
          className="text-on_secondary text-sm border-b-2 border-on_secondary w-32"
        >
          Contact
        </h1>
        <p className="text-on_secondary text-xs">David Phan</p>
        <a
          href="https://davphan.github.io/Portfolio/"
          className="text-on_secondary text-xs hover:opacity-50"
        >
          Website
        </a>
        <a
          href="https://github.com/davphan"
          className="text-on_secondary text-xs hover:opacity-50"
        >
          GitHub
        </a>
      </div>
      <div className="flex flex-col  gap-2">
        <h1
          className="text-on_secondary text-sm border-b-2 border-on_secondary w-32"
        >
          Review
        </h1>
        <a
          href=""
          className="text-on_secondary text-xs hover:opacity-50"
        >
          Leave a review
        </a>
        <a
          href=""
          className="text-on_secondary text-xs hover:opacity-50"
        >
          Report an issue
        </a>
      </div>
    </div>
  );
}