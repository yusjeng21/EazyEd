import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import {
  FaFacebook,
  FaYoutube,
  // FaXTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa6";

const socialLinks = [
  { icon: FaGithub, href: "#" },
  { icon: FaLinkedin, href: "#" },
  { icon: FaYoutube, href: "#" },
  { icon: FaFacebook, href: "#" },
  // { icon: FaXTwitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-EazyEd-border bg-EazyEd-surface-2">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/"
              className="flex items-center gap-2"
              // onClick={() => setOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-EazyEd-primary text-white flex items-center justify-center">
                <Icon name="school" filled />
              </div>
              <span className="font-display text-lg font-bold">EazyEd</span>
            </Link>
          </div>
          <p className="text-sm text-EazyEd-text-muted mb-4 max-w-xs">
            Your one-stop hub for course resources, tutorials and student
            support.
          </p>
          <ul className="space-y-2 text-sm text-EazyEd-text-muted">
            <li className="flex items-center gap-2">
              <Icon name="call" size={18} /> +220 652 5719
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" size={18} /> support@eazyed.edu
            </li>
            <li className="flex items-center gap-2">
              <Icon name="location_on" size={18} /> UTG Campus, Faraba
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/resources", "Resources"],
              ["/tutorials", "Tutorials"],
              ["/announcements", "Announcements"],
              ["/study-tips", "Study Tips"],
              ["/contact", "Contact"],
              ["/bookmarks", "My Bookmarks"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-EazyEd-text-muted hover:text-EazyEd-primary transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://utg.edu.gm"
                target="_blank"
                rel="noreferrer"
                className="text-EazyEd-text-muted hover:text-EazyEd-primary">
                UTG Website
              </a>
            </li>
            <li>
              <a
                href="https://www.utg.edu.gm/libraries/"
                target="_blank"
                rel="noreferrer"
                className="text-EazyEd-text-muted hover:text-EazyEd-primary">
                UTG Library
              </a>
            </li>
            <li>
              <a
                href="https://www.utg.edu.gm/students/"
                target="_blank"
                rel="noreferrer"
                className="text-EazyEd-text-muted hover:text-EazyEd-primary">
                Students Guide
              </a>
            </li>
          </ul>
          <div className="flex gap-2 mt-5">
            {socialLinks.map(({ icon: SocialIcon, href }, index) => (
              <a
                key={index}
                href={href}
                className="w-9 h-9 rounded-full bg-EazyEd-surface border border-EazyEd-border flex items-center justify-center text-EazyEd-text-muted hover:text-EazyEd-primary hover:border-EazyEd-primary transition">
                <SocialIcon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-EazyEd-border py-5 text-center text-xs text-EazyEd-text-muted">
        © {new Date().getFullYear()} EazyEd. Built for students, by students.
      </div>
    </footer>
  );
}
