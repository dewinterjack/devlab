SELECT vault.create_secret(
    'http://host.docker.internal:64321/functions/v1',
    'SUPABASE_FUNCTIONS_URL'
);

DROP TRIGGER "New Repo" ON public.devlab_repo;

DO $$
DECLARE
  supabase_functions_url TEXT;
BEGIN
  SELECT decrypted_secret
  INTO supabase_functions_url
  FROM vault.decrypted_secrets
  WHERE name = 'SUPABASE_FUNCTIONS_URL';

  EXECUTE format(
    'CREATE TRIGGER "New Repo" ' ||
    'AFTER INSERT ON public.devlab_repo ' ||
    'FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request( ' ||
    '''%s/trigger'', ' ||
    '''POST'', ' ||
    '''{"Content-type":"application/json"}'', ' ||
    '''{}'', ' ||
    '''1000'');',
    supabase_functions_url
  );
END $$;