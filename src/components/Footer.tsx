import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CQ</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Campus QuickShop
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted campus marketplace for all student essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Products
              </Link>
              <Link to="/login" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Login
              </Link>
              <Link to="/signup" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <div className="space-y-2">
              <Link to="/products?category=Electronics" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Electronics
              </Link>
              <Link to="/products?category=Books" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Books
              </Link>
              <Link to="/products?category=Clothing" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Clothing
              </Link>
              <Link to="/products?category=Stationery" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Stationery
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                <span>support@campusquickshop.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>Campus Center, University Ave</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Campus QuickShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;