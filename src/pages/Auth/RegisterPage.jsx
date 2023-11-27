import bcrypt from "bcryptjs"
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../api/axios"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const RegisterPage = () => {
  const navigate = useNavigate()

  const userRef = useRef(null)
  const errRef = useRef(null)

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)

    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)

    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])

  const hashPassword = async (pwd) => {
    const hash = await bcrypt.hash(pwd, 10)

    return hash
  }
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`users?username=${username}`)
      console.log(response.data)
      function checkAllFilteredUsers() {
        const users = response.data
        for (let user of users) {
          if (user.username.toLowerCase() === username.toLowerCase())
            return true
        }
        return false
      }
      return response.data.length > 0 && checkAllFilteredUsers()
    } catch (err) {
      console.log("error checking username availability", err)
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return
    }

    const isUsernameTaken = await checkUsernameAvailability(user)

    if (isUsernameTaken) {
      setErrMsg("Username already taken!")
      setSuccess(false)
      return
    }
    try {
      const response = await axios.post("./users", {
        username: user,
        password: (await hashPassword(pwd)).toString(),
        coursesRegistered: [],
      })
      setUser("")
      setPwd("")
      setMatchPwd("")
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } catch (err) {
      if (!err?.response) setErrMsg("No Server Response")
      else if (err.response?.status === 409)
        setErrMsg("aUsername already Taken")
      else setErrMsg("Registration Failed")
      errRef.current.focus()
    }
  }

  return (
    <div className="w-full h-screen grid place-content-center bg-gray-100">
      <section className="text-[1.3rem] py-10 px-10 border border-gray-400 bg-indigo-200 w-[30rem]">
        <p
          ref={errRef}
          aria-live="assertive"
          className={`${success ? "text-green-700" : "text-red-700"} font-bold`}
        >
          {success ? "User Registered Successfully" : errMsg}
        </p>
        <h1 className="font-bold text-[2rem] text-blue-800">
          Register
          <br />
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="username">
            Username:
            <span
              className={`${
                validName ? "visible" : "hidden"
              } text-green-700 font-bold`}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={`${
                validName || !user ? "hidden" : "visible"
              } text-red-700 font-bold`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="outline-none border border-gray-400 pl-2"
          />
          <p
            id="uidnote"
            className={`${
              userFocus && user && !validName ? "" : "hidden"
            } text-[1rem]`}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp; 4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password:
            <span
              className={`${
                validPwd ? "visible" : "hidden"
              } text-green-700 font-bold`}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={`${
                validPwd || !pwd ? "hidden" : "visible"
              } text-red-700 font-bold`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            className="outline-none border border-gray-400 pl-2"
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={`${
              pwdFocus && pwd && !validPwd ? "visible" : "hidden"
            } text-[1rem] `}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp; 8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed specail characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <span
              className={`${
                validMatch && matchPwd ? "visible" : "hidden"
              } text-green-700 font-bold`}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={`${
                validMatch || !matchPwd ? "hidden" : "visible"
              } text-red-700 font-bold`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            className="outline-none border border-gray-400 pl-2"
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={`${
              matchFocus && !validMatch ? "visible" : "hidden"
            } text-[1rem] `}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp; Must match the first password input field.
          </p>

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={`${
              validName && validPwd && validMatch ? "bg-black" : " bg-gray-600"
            } text-white my-4 btn`}
          >
            Sign Up
          </button>
        </form>
        <p className="py-4">
          Already Registered?
          <br />
          <Link
            to={"/login"}
            className="text-blue-800 underline hover:text-black"
          >
            Sign In
          </Link>
        </p>
      </section>
    </div>
  )
}

export default RegisterPage
