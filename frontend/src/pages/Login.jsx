import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import AuthFormLayout from '../components/AuthFormLayout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(formData)).unwrap()
      navigate('/dashboard')
      toast.success('Login successful!')
    } catch (err) {
      // Error handled in slice
    }
  }

  return (
    <AuthFormLayout title="Sign In">
      <div class="mb-8 flex flex-col items-center">
        <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" srcset="" />
        <h1 class="mb-2 text-2xl">Instagram</h1>
        <span class="text-gray-300">Enter Login Details</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="mb-4 text-lg text-white">
          <input class="rounded-3xl border-none bg-yellow-200/50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="email" placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <div class="mb-4 text-lg text-white">
          <input class="rounded-3xl border-none bg-yellow-200/50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="password" placeholder="*********"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        <div class="mt-8 flex justify-center text-lg text-black">
          <button type="submit" class="rounded-3xl bg-yellow-400/50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
        </div>
      </form>
      <p className='mt-4 text-center text-white'>Dont have a account? <Link to={'/register'} className='text-amber-200 hover:text-amber-500'>Register</Link> </p>
    </AuthFormLayout>
  )
}