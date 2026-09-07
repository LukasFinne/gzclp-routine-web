import { Link } from "@tanstack/react-router";

export const Welcome = () => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
        Before you can begin your workout, We need to know your current weight
        and protocol. As well as which step your a on ( A1, A2, B1, B2 )
      </p>
      <Link className="btn btn-primary" to="/onboard/configure">
        Let's begin!
      </Link>
    </div>
  );
};
