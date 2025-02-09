import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import AuthFormLayout from '../components/AuthFormLayout'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', confirm_password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.password !== formData.confirm_password) {
        toast.error('Passwords do not match')
      }
      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters long')
      }
      if (formData.password === formData.confirm_password) {
        await dispatch(register(formData)).unwrap()
        navigate('/login')
        toast.success('Registration successful!')

      }
    } catch (err) { }

  }

  return (
    <AuthFormLayout title="Sign In">
      <div className="mb-8 flex flex-col items-center">
        <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" srcset="" />
        <h1 className="mb-2 text-2xl">Instagram</h1>
        <span className="text-gray-300">Enter Login Details</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-lg text-white">
          <input className="rounded-3xl border-none bg-yellow-200/50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="email" placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <div className="mb-4 text-lg text-white">
          <input className="rounded-3xl border-none bg-yellow-200/50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="password" placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>

        <div className="mb-4 text-lg text-white">
          <input className="rounded-3xl border-none bg-yellow-200/50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="confirm_password" placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })} />
        </div>
        <div className="mt-8 flex justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl bg-yellow-400/50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Register</button>
        </div>
      </form>
      <p className='mt-4 text-center text-white'>Already have a account? <Link to={'/login'} className='text-amber-200 hover:text-amber-500'>Login</Link> </p>
    </AuthFormLayout>
  )
}