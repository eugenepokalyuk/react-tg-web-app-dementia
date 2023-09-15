import React from 'react';
import Button from "../Button/Button";
import { useTelegram } from "../../services/hooks/useTelegram";
import './Header.css';
import { ReactComponent as Logo } from '../../images/logo.svg'

const Header = () => {
    const { user, onClose } = useTelegram();

    return (
        <header className={'header'}>
            <nav className={'nav'}>
                <Button onClick={onClose}>Закрыть</Button>
                <span className={'username'}>
                    {user?.username}
                </span>
            </nav>
            <div className={'mt6 flex'}>
                <Logo className={'logo'} />
            </div>
        </header>
    );
};

export default Header;