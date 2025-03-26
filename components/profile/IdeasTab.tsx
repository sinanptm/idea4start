import { Card, CardHeader, CardTitle } from "../ui/card";
import { CardContent } from '../ui/card';
import { TabsContent } from "../ui/tabs";
import { CardDescription } from "../ui/card";
import { memo } from "react";

const IdeasTab = () => {
    return (
        <TabsContent value="ideas" className="mt-6">
            <Card className="bg-card border-gray-800">
                <CardHeader>
                    <CardTitle>My Ideas</CardTitle>
                    <CardDescription>
                        Ideas you&apos;ve shared with the community
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        You haven&apos;t shared any ideas yet.
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default memo(IdeasTab);