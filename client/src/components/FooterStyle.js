import styled from "styled-components";

export const Box = styled.footer`
    width: 100%;
    background: #020617 !important;
    color: #ffffff !important;
    padding: 80px 20px 40px 20px; /* Increased top padding */
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;

    
    border-top: 1px solid rgba(255, 255, 255, 0.08); 

    
    box-shadow: 0 -10px 50px rgba(0, 0, 0, 0.5);


    
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
`;

export const FooterContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const MottoBar = styled.div`
    text-align: center;
    margin-bottom: 60px;
    
    p {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 6px;
        font-weight: 700;
        color: #fbbf24 !important; /* Force Gold */
        margin: 0;

        @media (max-width: 480px) {
            letter-spacing: 2px;
            font-size: 11px;
        }
    }
`;

export const Row = styled.div`
    display: grid;
    /* Adjusted for mobile: 1 column on small phones, grid on tablets */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;

    /* Ensure plain text inside columns stays visible */
    p {
        color: rgba(255, 255, 255, 0.7) !important;
        margin: 0;
    }

    @media (max-width: 480px) {
        align-items: center;
    }
`;

export const Heading = styled.h4`
    font-size: 17px;
    color: #fbbf24 !important; 
    margin: 0 0 25px 0;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 40px;
        height: 3px;
        background: #fbbf24;
        margin-top: 8px;
        border-radius: 2px;
        @media (max-width: 480px) {
            margin: 8px auto 0 auto; /* Center the line on mobile */
        }
    }
`;

export const FooterLink = styled.a`
    color: rgba(255, 255, 255, 0.6) !important;
    margin-bottom: 12px;
    font-size: 15px;
    text-decoration: none;
    transition: 0.3s ease;
    display: inline-block;

    &:hover { 
        color: #fbbf24 !important; 
        transform: translateX(5px); 
    }

    @media (max-width: 480px) {
        &:hover { transform: none; }
    }
`;

export const SocialGrid = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 10px;
`;

export const SocialIcon = styled.a`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fbbf24 !important;
    transition: all 0.4s ease;

    &:hover {
        background: #fbbf24;
        color: #020617 !important;
        transform: translateY(-5px);
    }
`;

export const BottomRow = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
    text-align: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4) !important;
`;