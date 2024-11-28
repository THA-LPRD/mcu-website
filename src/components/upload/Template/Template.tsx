import { useState, useRef } from 'react';

import { Eye, Upload } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


export function Template() {
    const [htmlContent, setHtmlContent] = useState('<div style="padding: 25%; height: 100%; text-align: center; font-size: 48px; color: gray; display: flex; justify-content: center; align-items: center">Preview here</div>');
    const previewRef = useRef(null);
    // const [isExporting, setIsExporting] = useState(false);

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Template Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Template Selection</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Basic Template</option>
                      <option>Social Media Card</option>
                      <option>Banner Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input placeholder="Enter title..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea placeholder="Enter description..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Color</label>
                    <Input type="color" className="h-10" />
                  </div>
                  <Button>
                    <Eye className="w-4 h-4 mr-2" />
                    Update Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
            
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
                    // onClick={setIsExporting(true)}
                    // disabled={isExporting}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                    </Button>
                </CardContent>
            </Card>
          </div>
    );
}
