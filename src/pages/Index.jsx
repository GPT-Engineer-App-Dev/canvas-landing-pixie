import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Simple animation
    let x = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, canvas.height / 2, 20, 0, 2 * Math.PI);
      ctx.fillStyle = '#4F46E5';
      ctx.fill();
      x = (x + 2) % canvas.width;
      requestAnimationFrame(draw);
    };
    draw();

    // Smooth scroll for navigation links
    const handleNavClick = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        document.querySelector(target).scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleNavClick);
    });

    return () => {
      document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">Logo</div>
          <nav className="space-x-4">
            <Link to="#home" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="#about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="#contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section id="home" className="bg-indigo-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Canvas App</h1>
            <p className="text-xl mb-8">Experience the power of interactive drawing</p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
            </Button>
          </div>
        </section>

        <section id="canvas" className="py-20">
          <div className="container mx-auto px-4">
            <canvas 
              ref={canvasRef} 
              className="w-full h-[400px] border border-gray-300 rounded-lg shadow-md"
            />
          </div>
        </section>

        <section id="about" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
            <p className="text-lg text-center max-w-2xl mx-auto">
              We are passionate about creating interactive and engaging web experiences. 
              Our canvas app allows you to unleash your creativity in a digital space.
            </p>
          </div>
        </section>

        <section id="contact" className="bg-indigo-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <p className="text-lg mb-8">Have questions? Reach out to us!</p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Send a Message
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <Link to="#" className="hover:text-indigo-400">Privacy Policy</Link>
              <Link to="#" className="hover:text-indigo-400">Terms of Service</Link>
            </div>
            <div className="space-x-4">
              <a href="#" className="text-2xl hover:text-indigo-400">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-2xl hover:text-indigo-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl hover:text-indigo-400">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;