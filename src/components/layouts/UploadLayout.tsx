import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Settings, Image as ImageIcon } from 'lucide-react';
import { PNGUpload } from '@/components/upload/PNGUpload/PNGUpload';
import { HTMLtoPNG } from '@/components/upload/HTMLtoPNG/HTMLtoPNG';
import { Template } from '@/components/upload/Template/Template';

export default function ImageTools() {
    const [selectedTab, setSelectedTab] = useState('png-upload');
    // const [previewImage, setPreviewImage] = useState(null);
    
    return (
      <div className="container mx-auto p-4 max-w-5xl">
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
        

        <TabsContent value="png-upload">
            <PNGUpload></PNGUpload>
        </TabsContent>
        <TabsContent value="html-to-png">
            <HTMLtoPNG></HTMLtoPNG>
        </TabsContent>
        <TabsContent value="template">
            <Template></Template>
        </TabsContent>
        </Tabs>
      </div>
    );
}