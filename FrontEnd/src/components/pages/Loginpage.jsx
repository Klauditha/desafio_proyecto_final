import Login from "@/components/Login"
import { Card } from "../ui/card"

const Loginpage = () => {
  return (
    <div className="flex justify-center pb-16">
    <div className="flex justify-center ">
      <Card className="hidden md:flex md:justify-end flex-shrink-0 w-1/3 rounded-l-xl">
        <img src="https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="description_of_image" className=" rounded-l-xl rounded-r-none invisible md:visible" />
      </Card>
      <Login/>
    </div>
    </div>
  )
}

export default Loginpage