import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import Card from '../components/Card';

const About = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card>
          <Card.Header>
            <Card.Title>About Us</Card.Title>
          </Card.Header>
          
          <Card.Content className="text-lg">
            <p className="mb-4">
              Welcome to Voila Violet, where luxury meets quality in every strand. We take pride in offering premium 100% human hair bundles that are ethically sourced and crafted with the utmost care.
            </p>
            <p className="mb-4">
              Our mission is to provide you with the finest quality hair bundles that give you the length, volume, and confidence you deserve.
            </p>
            <p>
              Each bundle is carefully selected and processed to ensure maximum durability, softness, and a natural look that lasts.
            </p>
          </Card.Content>

          <Card.Footer>
            <h2 className="text-2xl font-semibold text-custom-purple mb-4">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-custom-purple mr-2">•</span>
                <span>100% Human Hair - No synthetic fibers</span>
              </li>
              <li className="flex items-start">
                <span className="text-custom-purple mr-2">•</span>
                <span>Ethically Sourced - Responsibly harvested</span>
              </li>
              <li className="flex items-start">
                <span className="text-custom-purple mr-2">•</span>
                <span>Premium Quality - Carefully selected and processed</span>
              </li>
              <li className="flex items-start">
                <span className="text-custom-purple mr-2">•</span>
                <span>Variety of Lengths - From 10 inches to 20 inches available</span>
              </li>
            </ul>
          </Card.Footer>

          <Card.Footer border={false} className="text-center">
            <Link 
              to="/products" 
              className="inline-block bg-custom-purple hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              View Our Products
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default About;
