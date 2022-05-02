// React imports
import React from 'react';
import { Link } from 'react-router-dom';

// Library imports
import { CdsButton } from '@cds/react/button';

// App imports
import { NavRoutes } from '../../shared/constants/NavRoutes.constants';
import TceLogoAndTitle from '../../assets/tce-logo-and-title.svg';
import RolloverBanner  from './RolloverBanner/RolloverBanner';
import './Welcome.scss';

const Welcome: React.FC = () => {
    return (
        <>
            <div cds-layout="vertical col:8 ">
                <img src={TceLogoAndTitle} className="title-image " alt="tce logo"/>
            </div>
            <div cds-layout="col:4">
                <CdsButton action="flat" onClick={() => {
                    window.open('http://tanzucommunityedition.io', '_blank');
                }}>Learn more at tanzucommunityedition.io</CdsButton>
            </div>
            <div cds-layout="vertical gap:lg col:8">
                <div cds-text="subsection">
                    Tanzu Community Edition is VMware&apos;s Open Source Kubernetes distribution. VMware Tanzu Community Edition
                    is a full-featured, easy-to-manage Kubernetes platform for learners and users, especially those working
                    in small-scale or pre-production environments.
                </div>
                <div className="section-raised getting-started-container" cds-layout="grid vertical gap:lg p:md">
                    <div cds-text="section" cds-layout="col:12" className="text-blue">Ready to dive in?</div>
                    <div cds-text="subsection" cds-layout="col:9">
                        Get started with creating a local development environment or a production-ready environment on a cloud provider.
                    </div>
                    <nav cds-layout="col:12">
                        <Link to={NavRoutes.GETTING_STARTED}>
                            <CdsButton>Let&apos;s Get Started</CdsButton>
                        </Link>
                    </nav>
                </div>

            </div>
            <div cds-layout="grid col:12 gap:md align:stretch">
                <div cds-text="section" className="text-blue" cds-layout="col:12 p-y:md">
                    Explore VMware Tanzu
                </div>
                <RolloverBanner/>
            </div>
        </>
    );
};

export default Welcome;
