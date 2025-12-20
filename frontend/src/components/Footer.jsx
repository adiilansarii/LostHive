export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#F29AAE]/30">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-[#301CA0]">
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <p>Home</p>
          <p>Report Lost Item</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <p>FAQs</p>
          <p>Contact Us</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-3 mt-2">
            <span className="w-8 h-8 bg-[#7132CA] text-white rounded-full flex items-center justify-center">f</span>
            <span className="w-8 h-8 bg-[#7132CA] text-white rounded-full flex items-center justify-center">t</span>
            <span className="w-8 h-8 bg-[#7132CA] text-white rounded-full flex items-center justify-center">i</span>
          </div>
        </div>

        <div className="md:text-right">
          © 2024 Lost & Found <br />
          All Rights Reserved
        </div>
      </div>

      <div className="bg-[#301CA0] text-white text-center py-3 text-sm">
        © 2024 Lost & Found | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
}
