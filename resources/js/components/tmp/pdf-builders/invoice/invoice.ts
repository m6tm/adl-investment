import moment from 'moment';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Companie, Invoice, Preview } from '../../interfaces/pages/invoice';



export function generateInvoice(invoice: Invoice, preview: Preview, { name: company_name }: Companie, action: 'download' | 'export' = 'download') {
        let doc = new jsPDF('p', 'px', 'a4');
        let largeur = doc.internal.pageSize.getWidth();
        let hauteur = doc.internal.pageSize.getHeight();

        // Title
        doc.setFontSize(16);
        doc.setTextColor('#007bff');
        doc.text(`Invoice ${invoice.invoice_code}`, 30, 40);
        doc.setTextColor('#000000');

        // Company Name
        doc.setFontSize(16);
        doc.setTextColor('#007bff');
        doc.text(`${company_name}`, largeur - 200, 40);
        doc.setTextColor('#000000');

        // Details
        doc.setFontSize(14);
        doc.setTextColor('#007bff');
        doc.text('Details', 30, 60);
        doc.setTextColor('#000000');

        // Invoice name
        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Invoice name:', 30, 80);
        doc.text(invoice.invoice_name, 100, 80);

        // Bill To
        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Bill To:', 30, 100);
        doc.setFontSize(10);
        doc.text(invoice.adress.house_number, 40, 114);
        doc.text(invoice.adress.street, 40, 125);
        doc.text(invoice.adress.city, 40, 136);

        // Due date
        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Due date:', 30, 155);
        doc.setFontSize(10);
        doc.text(moment(invoice.date_due).format("DD/MM/YYYY"), 100, 155);

        // Date issue
        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Date issue:', 30, 168);
        doc.setFontSize(10);
        doc.text(moment(invoice.date_issue).format("DD/MM/YYYY"), 100, 168);

        // Products
        doc.setFontSize(14);
        doc.setTextColor('#007bff');
        doc.text('Products', 30, 189);
        doc.setTextColor('#000000');

        // Définition des styles
        const headerStyle = { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' };
        const evenRowStyle = { fillColor: 240 };
        const oddRowStyle = { fillColor: 255 };
        const totalRowStyle = { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' };

        // Définition des colonnes
        const columns = [
                { title: 'Entitled', dataKey: 'entitled' },
                { title: 'Description', dataKey: 'description' },
                { title: 'Tax 1', dataKey: 'tax1' },
                { title: 'Tax 2', dataKey: 'tax2' },
                { title: 'Discount', dataKey: 'discount' },
                { title: 'Cost', dataKey: 'cost' },
                { title: 'Quantity', dataKey: 'quantity' },
                { title: 'Price', dataKey: 'price' },
        ];

        // Définition des lignes
        let rows: Array<any> = [];
        invoice.items.forEach(item => {
                rows.push({ entitled: item.item_name, description: item.description, tax1: `${item.tax1}%`, tax2: `${item.tax2}%`, discount: `${item.discount}%`, cost: item.cost, quantity: item.qty, price: item.price })
        })

        // Ajout du contenu de la table
        autoTable(doc, {
                columns,
                body: rows,
                theme: 'striped',
                headStyles: headerStyle as any,
                alternateRowStyles: [evenRowStyle, oddRowStyle] as any,
                footStyles: totalRowStyle as any,
                foot: [{ entitled: 'Total Price', description: '', tax1: '', tax2: '', discount: '', cost: '', quantity: '', price: `$${invoice.items.reduce((accumulator, current_item) => accumulator + current_item.price, 0)}` }],
                startY: 198
        });

        let lastPosition: number = (doc as any).previousAutoTable.finalY + 50,
        repportHeight = (lastPosition + 100) - lastPosition,
        documentPaddingY = 40

        if ((lastPosition + repportHeight + documentPaddingY) >= hauteur) {
                lastPosition = 40
                doc = doc.addPage('a4', 'p')
        }

        // Repport

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Subtotal', largeur - 300, lastPosition);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`$${preview.subtotal}`, largeur - 150, lastPosition);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Discount', largeur - 300, lastPosition + 20);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`$${preview.discount}`, largeur - 150, lastPosition + 20);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Tax', largeur - 300, lastPosition + 40);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`${preview.tax}%`, largeur - 150, lastPosition + 40);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Invoice Total', largeur - 300, lastPosition + 60);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`$${preview.invoice_total}`, largeur - 150, lastPosition + 60);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Paid to date', largeur - 300, lastPosition + 80);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`- $${preview.paid_to_date}`, largeur - 150, lastPosition + 80);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text('Balance (USD)', largeur - 300, lastPosition + 100);

        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`$${preview.current_balance}`, largeur - 150, lastPosition + 100);

        const file_name = `invoice_${invoice.invoice_code}.pdf`
        // Sauvegarde du document pdf
        if (action == 'download') {
                doc.save(file_name);
                return null
        }
        let blob = doc.output('blob')
        let file = new File([blob], file_name, { endings: 'native', type: 'application/pdf' })
        return file
}