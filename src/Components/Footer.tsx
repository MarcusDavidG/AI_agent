
const Footer = () => (
    <footer className="bg-neutral-900 text-neutral-400 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Starknet Agent. All rights reserved.</p>
        <p className="mt-2">
          Follow us on{' '}
          <a
            href="https://twitter.com/starknet"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Twitter
          </a>{' '}
          and{' '}
          <a
            href="https://discord.gg/starknet"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Discord
          </a>
        </p>
      </div>
    </footer>
  );
  
  export default Footer;