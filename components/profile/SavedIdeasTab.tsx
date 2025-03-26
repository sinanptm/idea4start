import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TabsContent } from '../ui/tabs';

const SavedIdeasTab = () => {
    return (
        <TabsContent value="saved" className="mt-6">
            <Card className="bg-card border-gray-800">
                <CardHeader>
                    <CardTitle>Saved Ideas</CardTitle>
                    <CardDescription>
                        Ideas you&apos;ve bookmarked for later
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        You haven&apos;t saved any ideas yet.
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default memo(SavedIdeasTab);