import React from 'react';
import {
    UserOutlined,
    FormOutlined,
    SolutionOutlined,
    TableOutlined,
    AlertOutlined,
    UsergroupAddOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SaveOutlined,
    CloseOutlined,
    BankOutlined,
    CarOutlined,
    SafetyCertificateOutlined,
    FolderOpenOutlined,
} from '@ant-design/icons';

const IconSwitcher = (icon) => {
    switch (icon) {
        case 'quote':
            return <FormOutlined />;
        case 'policy':
            return <SolutionOutlined />;
        case 'user':
            return <UserOutlined />;
        case 'catalog':
            return <TableOutlined />;
        case 'users':
            return <UsergroupAddOutlined />;
        case 'claims':
            return <AlertOutlined />;
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
        case 'bank':
            return <BankOutlined />;
        case 'car':
            return <CarOutlined />;
        case 'security':
            return <SafetyCertificateOutlined />;
        case 'folder':
            return <FolderOpenOutlined />;
        default:
            console.log('Icono no encontrado:', icon);
            return '☢︎';
    }
};

export default IconSwitcher;
