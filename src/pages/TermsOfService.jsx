import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300 py-8">
      <Link to="/">
        <Button variant="ghost" className="pl-0 mb-6 hover:bg-transparent hover:text-accent-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="bg-bg-secondary rounded-2xl p-8 border border-bg-elevated shadow-xl space-y-6 text-text-secondary">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Terms of Service</h1>
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and PS Technologies ("we," "us," or "our"), concerning your access to and use of the MeetingStack website and service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">2. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">3. User Registration</h2>
          <p>
            You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">4. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">5. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
          </p>
        </section>

         <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">6. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at PS Technologies.
          </p>
        </section>
      </div>
    </div>
  )
}
