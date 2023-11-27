import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
  const userRef = useRef(null)
  const errRef = useRef(null)

  const [user, setUser] = useState(null)
  const [pwd, setPwd] = useState(null)
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full h-screen bg-gray-100 grid place-content-center">
      <section className="text-[1.3rem] py-10 px-10 border border-gray-400 bg-indigo-200 w-[30rem]">
        <p ref={errRef} className={`${errMsg ? "visible" : "hidden"}`}>
          {errMsg}
        </p>
        <h1 className="font-bold text-[2rem] text-blue-800">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            className="outline-none border border-gray-400 pl-2"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            className="outline-none border border-gray-400 pl-2"
          />
          <button
            disabled={!user || !pwd ? true : false}
            className={`${
              user && pwd ? "bg-black" : "bg-gray-600"
            } text-white my-4 btn`}
          >
            Sign In
          </button>
        </form>
        <p className="py-4">
          Need an Accoount?
          <br />
          <span>
            <Link
              to={`/register`}
              className="text-blue-800 underline hover:text-black"
            >
              Sign Up
            </Link>
          </span>
        </p>
      </section>
    </div>
  )
}

export default LoginPage
