import React from "react";


function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className='row justify-content-center my-2'>
      <div className="col-sm-6 col-lg-4 text-center">
        <footer>
          <p>Copyright ⓒ {year}</p>
        </footer>
      </div>
    </div>
  )
}

export default Footer;
