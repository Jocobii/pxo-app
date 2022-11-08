import React from 'react';
import {
    SwitcherOutlined,
    CompassOutlined,
    ReconciliationOutlined,
    BankOutlined,
    ReadOutlined,
    ScanOutlined,
    FileDoneOutlined,
    ApartmentOutlined,
    IssuesCloseOutlined,
    HistoryOutlined,
    BlockOutlined,
    SettingOutlined,
    UserOutlined,
    CarOutlined,
    ScheduleOutlined,
    CopyOutlined,
    TableOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SaveOutlined,
    CloseOutlined,
    ImportOutlined,
    SafetyCertificateOutlined,
    FileProtectOutlined,
    BuildOutlined,
    CloudSyncOutlined,
    FilePptOutlined,
    CloudDownloadOutlined,
    CalculatorOutlined,
} from '@ant-design/icons';

const IconSwitcher = (icon) => {
    switch (icon) {
        case 'switcher':
            return <SwitcherOutlined />;
        case 'compass':
            return <CompassOutlined />;
        case 'reconciliation':
            return <ReconciliationOutlined />;
        case 'bank':
            return <BankOutlined />;
        case 'read':
            return <ReadOutlined />;
        case 'scan':
            return <ScanOutlined />;
        case 'file-done':
            return <FileDoneOutlined />;
        case 'apartment':
            return <ApartmentOutlined />;
        case 'issues-close':
            return <IssuesCloseOutlined />;
        case 'history':
            return <HistoryOutlined />;
        case 'block':
            return <BlockOutlined />;
        case 'setting':
            return <SettingOutlined />;
        case 'user':
            return <UserOutlined />;
        case 'car':
            return <CarOutlined />;
        case 'schedule':
            return <ScheduleOutlined />;
        case 'copy':
            return <CopyOutlined />;
        case 'table':
            return <TableOutlined />;
        case 'edit':
            return <EditOutlined />;
        case 'delete':
            return <DeleteOutlined />;
        case 'eye':
            return <EyeOutlined />;
        case 'save':
            return <SaveOutlined />;
        case 'close':
            return <CloseOutlined />;

        case 'import':
            return <ImportOutlined />;
        case 'safety-certificate':
            return <SafetyCertificateOutlined />;
        case 'file-protect':
            return <FileProtectOutlined />;
        case 'build':
            return <BuildOutlined />;
        case 'cloud-sync':
            return <CloudSyncOutlined />;
        case 'file-ppt':
            return <FilePptOutlined />;
        case 'cloud-download':
            return <CloudDownloadOutlined />;
        case 'calculator':
            return <CalculatorOutlined />;
        default:
            console.log('Icono no encontrado:', icon);
            return '☢︎';
    }
};

export default IconSwitcher;
