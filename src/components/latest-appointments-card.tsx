import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LatestAppointmentsItem } from "./latest-appointments-item";

export function LatestAppointmentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <LatestAppointmentsItem />
        </div>
      </CardContent>
    </Card>
  );
}
