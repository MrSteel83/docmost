export const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

export const main = {
  backgroundColor: '#edf2f7',
  fontFamily,
};

export const container = {
  maxWidth: '580px',
  margin: '10px auto',
  backgroundColor: '#ffffff',
  borderColor: '#e8e5ef',
  borderRadius: '2px',
  borderWidth: '1px',
  boxShadow: '0 2px 0 rgba(0, 0, 150, 0.025), 2px 4px 0 rgba(0, 0, 150, 0.015)',
  padding: '15px 0px 0px 0px',
};

export const content = {
  padding: '5px 20px 10px 20px',
  textAlign: 'center' as const,
};

export const paragraph = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  color: '#333',
  lineHeight: 1.5,
  fontSize: 14,
};

export const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0',
};

export const logo = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
};

export const link = {
  textDecoration: 'underline',
};

export const footer = {
  maxWidth: '580px',
  margin: '0 auto',
};

export const button = {
  backgroundColor: '#176ae5',
  borderRadius: '10px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  maxWidth: '200px',
  padding: '15px',
  margin: '0 auto',
};
