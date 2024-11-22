import { useState, useRef } from 'react';

import html2canvas from 'html2canvas';

import { Upload } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function HTMLtoPNG() {
    const [htmlContent, setHtmlContent] = useState('<div style="padding: 25%; height: 100%; text-align: center; font-size: 48px; color: gray; display: flex; justify-content: center; align-items: center">Preview here</div>');
    const previewRef = useRef(null);
    const [isExporting, setIsExporting] = useState(false);

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    const uploadPNG = async (fileData: Blob, fileName: string, url: string) => {
        try {
            const formData = new FormData();
            formData.append('file', fileData, fileName);
    
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                const responseText = await response.text();
                return { success: true, message: 'Datei erfolgreich hochgeladen: ' + responseText };
            } else {
                return { success: false, message: 'Fehler beim Hochladen der Datei. Statuscode: ' + response.status };
            }
        } catch (error) {
            console.error('Fehler beim Hochladen der Datei:', error);
            if (error instanceof Error) {
                return { success: false, message: 'Fehler beim Hochladen der Datei: ' + error.message };
            } else {
                return { success: false, message: 'Fehler beim Hochladen der Datei' };
            }
        }
    }

    const exportToPNG = async () => {
        if (!previewRef.current) return;
        
        setIsExporting(true);
        
        try {
          const canvas = await html2canvas(previewRef.current, {
            backgroundColor: 'white',
            scale: 1, // Höhere Qualität
            width: 800,
            height: 480,
            logging: false,
            useCORS: true
          });
          
          // Canvas in Blob umwandeln
          canvas.toBlob((blob) => {
            if (!blob) {
              throw new Error('Blob konnte nicht erstellt werden');
            }

            uploadPNG(blob, "html_conversion.png", '/api/v2/UploadImg')
            
            // // Download initiieren
            // const url = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.href = url;
            // link.download = 'preview.png';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // URL.revokeObjectURL(url);
          }, 'image/png');
        } catch (error) {
            console.log(error);
          // setErrorMessage('Export fehlgeschlagen: ' + error.message);
        } finally {
          setIsExporting(false);
        }
      };


    return (
        <div className="grid grid-cols-1 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg bg-gray-50 h-[480px] w-[800px]">
                        <div 
                        ref={previewRef} 
                        className="preview-content h-[480px] w-[800px]"
                        dangerouslySetInnerHTML={createMarkup(htmlContent)}>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>HTML Input</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Enter your HTML here..."
                        className="min-h-[300px]"
                        onChange={(e) => setHtmlContent(e.target.value)}
                        spellCheck="false"
                    />
                    <Button 
                    className="mt-4"
                    onClick={exportToPNG}
                    disabled={isExporting}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
