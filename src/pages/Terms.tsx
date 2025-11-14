import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using GadgetVerse, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Website</h2>
            <p className="text-muted-foreground">
              GadgetVerse provides product reviews and recommendations for informational purposes. You agree to use this website 
              only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
            <p className="text-muted-foreground">
              We strive to provide accurate product information, reviews, and recommendations. However, we do not guarantee the 
              accuracy, completeness, or reliability of any content. Product availability, pricing, and specifications are subject 
              to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Affiliate Disclosure</h2>
            <p className="text-muted-foreground">
              GadgetVerse participates in affiliate marketing programs. This means we may earn a commission when you click on 
              product links and make a purchase. This does not affect the price you pay and helps us maintain this service. 
              Our reviews remain unbiased and independent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. User Accounts</h2>
            <p className="text-muted-foreground">
              When you create an account with us, you are responsible for maintaining the security of your account and for all 
              activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
            <p className="text-muted-foreground">
              Users may submit reviews and ratings. By submitting content, you grant us a non-exclusive, worldwide, royalty-free 
              license to use, modify, and display that content. You are responsible for the content you submit and must ensure 
              it does not violate any laws or third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on GadgetVerse, including text, graphics, logos, and images, is the property of GadgetVerse or its 
              content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              GadgetVerse shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising 
              from your use of the website or any products purchased through affiliate links. We do not guarantee the quality 
              or performance of any third-party products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website contains links to third-party websites. We are not responsible for the content, privacy policies, 
              or practices of these external sites. Clicking on affiliate links will redirect you to the merchant's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Modifications to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to 
              the website. Your continued use of the website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              GadgetVerse operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms and Conditions, please contact us at contact@gadgetverse.com
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

export default Terms;
