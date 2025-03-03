import sys
from django.core.management.base import BaseCommand
from subprocess import Popen


class Command(BaseCommand):
    help = "Run Celery worker and beat in separate processes"

    def handle(self, *args, **options):
        
        worker_cmd = "celery -A backend worker --pool=solo --loglevel=info"
        beat_cmd = "celery -A backend beat --loglevel=info"
        
        processes = [
            Popen(worker_cmd.split(), stdout=sys.stdout, stderr=sys.stderr),
            Popen(beat_cmd.split(), stdout=sys.stdout, stderr=sys.stderr),
        ]

        try:
            for p in processes:
                p.wait()
        except KeyboardInterrupt:
            for p in processes:
                p.terminate()
            self.stdout.write(self.style.SUCCESS("\nStopped all processes"))
