// React imports
import React, { useContext } from 'react';

// Library imports
import styled from 'styled-components';

// App imports
import TestRender from '../../components/TestRender';
import Wizard from '../../shared/components/wizard/Wizard';
import SelectManagementCluster from './SelectManagementCluster';
import { ManagementCluster } from '../../shared/models/ManagementCluster';
import { WcStore } from '../../state-management/stores/Store.wc';
import ClusterTopologyStep from './ClusterTopologyStep';
import './WorkloadClusterWizard.scss';
import ClusterAttributeStep from './ClusterAttributeStep';

const fakeServiceRetrievesManagementClusterObjects = (): ManagementCluster[] => {
    return [
        { name: 'shimon-test-cluster-1', provider: 'aws', created: '10/22/2021', description: 'just fooling around' },
        { name: 'some-other-cluster', provider: 'vsphere', created: '1/13/2022', description: 'a very serious cluster' }
    ];
};

const wcTabNames = ['Select a Management Cluster', 'Cluster topology', 'Cluster attributes'] as string[];

function WorkloadClusterWizard (props: any) {
    return (
        <Wizard tabNames={wcTabNames} {...useContext(WcStore)} >
            <SelectManagementCluster
                                     retrieveManagementClusters={fakeServiceRetrievesManagementClusterObjects}
                                     selectedManagementCluster=""
                                     />
            <ClusterTopologyStep></ClusterTopologyStep>
            <ClusterAttributeStep></ClusterAttributeStep>
        </Wizard>
    );
}

export default WorkloadClusterWizard;
