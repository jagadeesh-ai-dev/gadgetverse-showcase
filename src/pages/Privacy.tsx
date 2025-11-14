import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Account information (email address, password)</li>
              <li>Profile information (display name, preferences)</li>
              <li>User-generated content (reviews, ratings, wishlist items)</li>
              <li>Communication data (support inquiries, feedback)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Automatically Collected Information</h2>
            <p className="text-muted-foreground mb-2">
              When you use GadgetVerse, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages viewed, time spent, click patterns)</li>
              <li>IP address and approximate location</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and maintain our services</li>
              <li>Authenticate your account and manage your wishlist</li>
              <li>Enable user reviews and ratings functionality</li>
              <li>Send important service notifications</li>
              <li>Improve and personalize your experience</li>
              <li>Analyze usage patterns and optimize performance</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="text-muted-foreground">
              Your data is securely stored using industry-standard encryption and security practices. We use Lovable Cloud 
              (powered by Supabase) for backend services, which provides enterprise-grade security including encryption at 
              rest and in transit, regular security audits, and compliance with data protection regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze 
              website traffic. You can control cookie settings through your browser, but some features may not function 
              properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground mb-2">
              We work with third-party service providers:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Lovable Cloud:</strong> Backend infrastructure and database services</li>
              <li><strong>Affiliate Partners:</strong> Product links and purchase tracking</li>
              <li><strong>Analytics Services:</strong> Website usage and performance monitoring</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              These providers have their own privacy policies and may collect data according to their terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Affiliate Marketing</h2>
            <p className="text-muted-foreground">
              When you click on product links and make purchases, affiliate partners may track your activity to process 
              commissions. This tracking is subject to the privacy policies of the respective merchants and affiliate networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-2">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
              <li>Control cookie preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to provide our services and comply with legal 
              obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, 
              except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
            <p className="text-muted-foreground">
              GadgetVerse is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please contact us 
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate 
              safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of significant changes by posting 
              the new policy on this page and updating the "Last Updated" date. Continued use of our services after changes 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: contact@gadgetverse.com
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
