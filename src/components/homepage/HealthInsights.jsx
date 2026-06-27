import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "5 Tips for Maintaining a Healthy Heart",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    date: "June 2026",
  },
  {
    id: 2,
    title: "How Regular Checkups Prevent Diseases",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309",
    date: "June 2026",
  },
  {
    id: 3,
    title: "Benefits of Online Doctor Consultations",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb",
    date: "June 2026",
  },
];

export default function HealthInsights() {
  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge badge-primary badge-outline p-2">
            Health Blog
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Healthcare Insights
          </h2>

          <p className="mt-4 text-base-content/70">
            Stay informed with expert advice and the latest healthcare
            recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <figure className="h-60 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </figure>

              <div className="card-body">
                <p className="text-primary text-sm">
                  {blog.date}
                </p>

                <h3 className="card-title">
                  {blog.title}
                </h3>

                <button className="btn btn-outline btn-primary mt-3">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}