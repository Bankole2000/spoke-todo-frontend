import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div style={{ position: 'absolute', bottom: '0', height: '64px', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', boxShadow: "5px 10px 18px #888" }}>
      <p style={{ margin: '0 auto' }}>&copy;{new Date().getFullYear()} - <a href="https://banky.studio" target="_blank" style={{ textDecoration: 'none', color: '#ED7D84' }} rel="noreferrer">Bankole Esan</a></p>
    </div>
  );
};

export default Footer;
