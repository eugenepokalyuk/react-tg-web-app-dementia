import React from 'react';
import Button from "../Button/Button";
import { useTelegram } from "../../services/hooks/useTelegram";
import './Footer.css';

const Footer = () => {
    const { user, onClose } = useTelegram();

    return (
        <div className={'footer fixed-bottom'}>
            <p>Материалы подготовлены на базе: Self-Administered Gerocognitive Exam – SAGE Test Form.</p>
            <p>COPYRIGHT © 2013 THE OHIO STATE UNIVERSITY ALL RIGHTS RESERVED Douglas W. Scharre, Scharre.1@osu.edu, (614) 293-4969</p>
        </div>
    );
};

export default Footer;