const Footer = () => (
  <footer className="bg-[#20232a] text-[#ffffff] py-6">
    <div className="container mx-auto text-center">
      <p>&copy; 2025 Starknet Agent. All rights reserved.</p>
      <p className="mt-2">
        Follow us on{' '}
        <a
          href="https://twitter.com/starknet"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          Twitter
        </a>{' '}
        and{' '}
        <a
          href="https://discord.gg/starknet"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          Discord
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
