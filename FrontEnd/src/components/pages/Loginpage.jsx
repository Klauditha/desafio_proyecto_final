import Login from "@/components/login/Login"
import { Card } from "../ui/card"

const Loginpage = () => {
  return (
    <div className="flex justify-center">
      <Card className="flex-shrink-0 flex w-1/3">
        <img src="https://images.unsplash.com/photo-1509266272358-7701da638078?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="description_of_image" className="rounded-xl" />
      </Card>
      <Login/>
    </div>
  )
}

export default Loginpage