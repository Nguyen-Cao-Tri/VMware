import React from 'react';
import './notfound.scss';

const NotFound: React.FC = () => {
  return (
    <section className="page_404">
      <div className="container_404">
        <div className="bg_404">
          <h1>404</h1>
        </div>

        <div className="contant_box_404">
          <h3 className="h2">Look like you are lost</h3>

          <p>the page you are looking for not avaible!</p>

          <a href="http://localhost:3000/" className="link_404">
            Go to Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
