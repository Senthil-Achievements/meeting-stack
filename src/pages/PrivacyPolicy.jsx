import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300 py-8">
      <Link to="/">
        <Button variant="ghost" className="pl-0 mb-6 hover:bg-transparent hover:text-accent-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="bg-bg-secondary rounded-2xl p-8 border border-bg-elevated shadow-xl space-y-6 text-text-secondary">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">1. Introduction</h2>
          <p>
            Welcome to MeetingStack ("we," "our," or "us"), created by PS Technologies. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Content Data:</strong> includes meeting notes, action items, and other user-generated content you store in the app.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To register you as a new customer.</li>
            <li>To provide the MeetingStack service to you (storing your notes and tasks).</li>
            <li>To manage our relationship with you.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We rely on Supabase Authentication and Row Level Security (RLS) to ensure your data is accessible only by you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="font-semibold text-text-primary">PS Technologies Support</p>
        </section>
      </div>
    </div>
  )
}
