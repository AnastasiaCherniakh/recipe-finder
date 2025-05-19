import logo from './assets/logo.png';

export default function Header() {
    return (
        <header>
            <nav>
                <img className="img-logo" src={logo} />
                <span className="text-logo">Recipe Finder</span>
            </nav>
     </header>
    )
}