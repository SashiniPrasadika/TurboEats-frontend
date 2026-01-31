import logo from 'assets/images/logo.jpeg';

export default function LogoIcon() {
  return (
    <img
      src={logo}
      alt="TurboEats"
      style={{
        width: 96,
        height: 96,
        objectFit: 'contain'
      }}
    />
  );
}
