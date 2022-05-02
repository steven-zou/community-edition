// React imports
import { CdsButton } from '@cds/react/button';
import { CdsControlMessage } from '@cds/react/forms';
import React, { useContext, useState } from 'react';

// Library imports
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// App imports
import './select-management-cluster.scss';
import { ManagementCluster } from '../../shared/models/ManagementCluster';
import { StepProps } from '../../shared/components/wizard/Wizard';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WcStore } from '../../state-management/stores/Store.wc';

const selectManagementClusterFormSchema = yup.object({
    SELECTED_MANAGEMENT_CLUSTER_NAME: yup.string().nullable().required('Please select a management cluster')
}).required();

interface SelectManagementClusterFormInputs {
    SELECTED_MANAGEMENT_CLUSTER_NAME: string;
}

const Description = styled.p`
    padding: 20px;
    line-height: 24px;
`;

const SubTitle = styled.h3`
    padding-left: 20px;
`;

interface SelectManagementClusterProps extends StepProps {
    retrieveManagementClusters: () => ManagementCluster[],
    selectedManagementCluster: string,
}

function SelectManagementCluster (props: Partial<SelectManagementClusterProps>) {
    const { state, dispatch } = useContext(WcStore);
    const methods = useForm<SelectManagementClusterFormInputs>({
        resolver: yupResolver(selectManagementClusterFormSchema),
    });
    const { register, handleSubmit, formState: { errors } } = methods;
    const { currentStep, goToStep, submitForm, retrieveManagementClusters, handleValueChange } = props;
    const onSubmit: SubmitHandler<SelectManagementClusterFormInputs> = (data) => {
        if (Object.keys(errors).length === 0) {
            if (goToStep && currentStep && submitForm) {
                if (handleValueChange) {
                    const clusterName = data.SELECTED_MANAGEMENT_CLUSTER_NAME;
                    const cluster = findClusterFromName(clusterName, clusters);
                    handleValueChange('SELECTED_MANAGEMENT_CLUSTER', cluster, currentStep, errors);
                } else {
                    console.error(`no handleChangeValue passed to SelectManagementCluster()?!`);
                }
                goToStep(currentStep + 1);
                submitForm(currentStep);
            }
        }
    };

    // TODO: validation on props' retrieveManagementClusters
    const clusters = retrieveManagementClusters ? retrieveManagementClusters() : [];
    const findClusterFromName = (clusterName: string, clusters: ManagementCluster[]) => {
        return clusters.find(cluster => cluster.name === clusterName);
    };

    // If SELECTED_MANAGEMENT_CLUSTER_NAME is already set, select that management cluster
    const selectedClusterName = state.data?.SELECTED_MANAGEMENT_CLUSTER?.name

    return (
        <div className="wizard-content-container" cds-layout="container:fill">
            <Description>
                Select a Management Cluster from which the workload cluster will be provisioned.
                <br/>
                After creation, the workload cluster can be used to run your application workloads.
                <br/>
            </Description>
            <div>
            <SubTitle>Select a Management Cluster</SubTitle>
                <div cds-layout="grid gap:md" key="header-mc-grid">
                    { ManagementClusterListHeader() }
                    { clusters.map((cluster: ManagementCluster) => {
                            const selected = selectedClusterName === cluster.name
                            return ManagementClusterInList(cluster, register, selected)
                        })
                    }
                </div>
            </div>

            <br/>
            { errors.SELECTED_MANAGEMENT_CLUSTER_NAME &&
                <CdsControlMessage status="error">{errors.SELECTED_MANAGEMENT_CLUSTER_NAME.message}</CdsControlMessage>
            }
            <br/>
            <CdsButton onClick={handleSubmit(onSubmit)}>NEXT</CdsButton>
        </div>
    );
}

function ManagementClusterListHeader() {
    return <>
        <div className="header-mc-grid" cds-layout="col:1"></div>
        <div className="text-white header-mc-grid" cds-layout="col:5">Cluster Name</div>
        <div className="text-white header-mc-grid" cds-layout="col:1">Provider</div>
        <div className="text-white header-mc-grid" cds-layout="col:1">Created</div>
        <div className="text-white header-mc-grid" cds-layout="col:4">Description</div>
    </>;
}

function ManagementClusterInList(cluster: ManagementCluster, register: any, selected: boolean) {
    return  <>
        { selected &&
            <input className="input-radio" cds-layout="col:1" type="radio" value={cluster.name} checked
                   {...register("SELECTED_MANAGEMENT_CLUSTER_NAME")} /> }
        { !selected &&
            <input className="input-radio" cds-layout="col:1" type="radio" value={cluster.name}
                   {...register("SELECTED_MANAGEMENT_CLUSTER_NAME")} /> }
            <div className="text-white" cds-layout="col:5">{cluster.name}</div>
            <div className="text-white" cds-layout="col:1">{cluster.provider}</div>
            <div className="text-white" cds-layout="col:1">{cluster.created}</div>
            <div className="text-white" cds-layout="col:4">{cluster.description}</div>
        </>
        ;
}

export default SelectManagementCluster;
