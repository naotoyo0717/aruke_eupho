import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    console.log({ currentUser });
    redirect("/top");
  } else if (!currentUser) {
    redirect("/signin");
  } else {
    return (
      <div className="text-center">
        {currentUser ? <div>認証中</div> : <div>未認証</div>}
      </div>
    );
  }
};

export default Home;
