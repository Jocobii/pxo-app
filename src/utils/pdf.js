import { message } from 'antd';
import fetcher from './_request';

export const printPDF = async (url, id) => {
    if (!id) return null;
    const { pdfUrl, error, message: msg } = await fetcher.getPDF(url, { id });
    if (error) {
        return message.error(msg);
    }
    window.open(pdfUrl);
    message.success('Se ha generado el contrato');
    // URL.revokeObjectURL(pdfUrl);
    return null;
};

export default printPDF;
