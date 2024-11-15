import UploadLayout from '@/components/layouts/UploadLayout';


export default function OperatingModePage() {
    return (
        <UploadLayout>
        </UploadLayout>
    );

}

/* 
import React, { useState } from 'react';
import { Upload, Eye, Settings, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ImageTools = () => {
  const [selectedTab, setSelectedTab] = useState('png-upload');
  const [previewImage, setPreviewImage] = useState(null);
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Tabs defaultValue="png-upload" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="png-upload" className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            PNG Upload
          </TabsTrigger>
          <TabsTrigger value="html-to-png" className="flex-1">
            <ImageIcon className="w-4 h-4 mr-2" />
            HTML to PNG
          </TabsTrigger>
          <TabsTrigger value="template" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Template Editor
          </TabsTrigger>
        </TabsList>

        // PNG Upload Tab 
        <TabsContent value="png-upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload PNG Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Input 
                  type="file" 
                  accept=".png"
                  className="hidden" 
                  id="png-upload"
                />
                <label 
                  htmlFor="png-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-gray-600">Drop your PNG here or click to upload</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        // HTML to PNG Tab 
        <TabsContent value="html-to-png">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>HTML Input</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your HTML here..."
                  className="min-h-[300px]"
                />
                <Button className="mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Generate Preview
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Preview will appear here
                  </div>
                </div>
                <Button className="mt-4">Download PNG</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        // Template Editor Tab 
        <TabsContent value="template">
          <div className="grid grid-cols-2 gap-4">
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
                <CardTitle>Template Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Template preview will appear here
                  </div>
                </div>
                <Button className="mt-4">Download PNG</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageTools;

*/