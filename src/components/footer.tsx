import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-sm">
              <span>Criado por </span>
              <a
                href="https://micleal.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Michael A L Costa{" "}
                <ExternalLink className="inline-block size-4" />
              </a>
            </h3>
          </div>
        </div>
      </div>
    </footer>
  );
}
